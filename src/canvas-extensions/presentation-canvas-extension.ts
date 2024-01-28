import { ItemView } from "obsidian"
import CanvasExtension from "./canvas-extension"

const SLIDE_NODE = {
  defaultSize: { width: 1600, height: 900 },
}

export default class PresentationCanvasExtension extends CanvasExtension {
  slides: any[] = []
  currentSlideIndex: number = 0

  constructor(plugin: any) {
    super(plugin)

    this.plugin.addCommand({
			id: 'create-new-slide',
			name: 'Create new slide',
			checkCallback: this.canvasCommand(() => this.addSlide())
    })

    this.plugin.addCommand({
			id: 'start-presentation',
      name: 'Start presentation',
      checkCallback: this.canvasCommand(() => this.startPresentation())
    })
  }

  canvasCommand(callback: () => void): (checking: boolean) => boolean {
    return (checking: boolean) => {
      if (checking) return this.canvas != null

      callback()
      return true
    }
  }

  renderMenu(): void {
    this.addMenuOption(
      this.createMenuOption(
        'new-slide', 
        'Create new slide', 
        'gallery-vertical', 
        () => this.addSlide()
      )
    )
  }

  renderNode(_node: any): void {}

  private getSlideName(index: number): string {
    return `Slide ${index}`
  }

  private getStartSlide(): any {
    for (const [_, node] of this.canvas.nodes) {
      const nodeData = node.getData()
      if (nodeData.type !== 'group') continue
      if (nodeData.label === this.getSlideName(1)) return node
    }

    return null
  }

  private getNextSlide(currentSlide: any): any {
    const edge = this.canvas.getEdgesForNode(currentSlide).first()
    if (edge == null) return null

    return edge.to.node
  }

  private getSlides(): any[] {
    const slides: any[] = []

    const startSlide = this.getStartSlide()
    if (startSlide == null) return slides

    let currentSlide = startSlide
    while (currentSlide != null && !slides.contains(currentSlide)) {
      slides.push(currentSlide)
      currentSlide = this.getNextSlide(currentSlide)
    }

    return slides
  }

  private addSlide() {
    const slideNumber = this.getSlides().length + 1

    this.canvas.createGroupNode({
      pos: this.getCenterCoordinates(SLIDE_NODE.defaultSize),
      size: SLIDE_NODE.defaultSize,
      label: this.getSlideName(slideNumber),
      save: true,
      focus: false,
    })
  }

  private gotoSlide(index: number) {
    this.currentSlideIndex = index
    this.canvas.zoomToBbox(this.slides[this.currentSlideIndex].bbox)
  }

  private async startPresentation() {
    this.slides = this.getSlides()
    this.currentSlideIndex = -1

    // Enter fullscreen mode
    this.canvas.wrapperEl.requestFullscreen()
    this.canvas.wrapperEl.classList.add('presentation-mode')

    // Lock canvas
    this.canvas.setReadonly(true)

    // Register event handler for keyboard navigation
    this.canvas.wrapperEl.onkeydown = (e: any) => {
      if (e.key === 'ArrowRight') {
        this.nextSlide()
      } else if (e.key === 'ArrowLeft') {
        this.previousSlide()
      }
    }

    // Register event handler for exiting presentation mode
    this.canvas.wrapperEl.onfullscreenchange = (_e: any) => {
      if (document.fullscreenElement) return
      this.endPresentation()
    }

    // Wait for fullscreen to be enabled
    await new Promise((resolve) => setTimeout(resolve, 250))

    // Zoom to first slide
    this.nextSlide()
  }

  private endPresentation() {
    this.canvas.wrapperEl.onkeydown = null
    this.canvas.wrapperEl.onfullscreenchange = null

    this.canvas.wrapperEl.classList.remove('presentation-mode')
    this.canvas.setReadonly(false)

    if (document.fullscreenElement) document.exitFullscreen()
  }

  private nextSlide() {
    // Only go to next slide if there are any slides left
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex += 1
    }

    this.gotoSlide(this.currentSlideIndex)
  }

  private previousSlide() {
    // Only go to previous slide if there are any slides left
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex -= 1
    }

    this.gotoSlide(this.currentSlideIndex)
  }
}