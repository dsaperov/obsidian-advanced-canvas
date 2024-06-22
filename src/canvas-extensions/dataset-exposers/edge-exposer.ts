import { Canvas, CanvasEdge, CanvasEdgeData } from "src/@types/Canvas"
import { CanvasEvent } from "src/core/events"
import SettingsManager from "src/settings"
import CanvasExtension from "../canvas-extension"

export function getExposedEdgeData(settings: SettingsManager): (keyof CanvasEdgeData)[] {
  const exposedData: (keyof CanvasEdgeData)[] = []

  if (settings.getSetting('edgesStylingFeatureEnabled')) exposedData.push('styleAttributes')
  if (settings.getSetting('portalsFeatureEnabled')) exposedData.push('isUnsaved')

  return exposedData
}

export default class EdgeExposerExtension extends CanvasExtension {
  isEnabled() { return true }

  init() {
    this.plugin.registerEvent(this.plugin.app.workspace.on(
      CanvasEvent.EdgeChanged,
      (_canvas: Canvas, edge: CanvasEdge) => {
        const edgeData = edge?.getData()
        if (!edgeData) return

        for (const exposedDataKey of getExposedEdgeData(this.plugin.settings)) {
            const datasetPairs = edgeData[exposedDataKey] instanceof Object
              ? Object.entries(edgeData[exposedDataKey])
              : [[exposedDataKey, edgeData[exposedDataKey]]]

            for (const [key, value] of datasetPairs) {
              if (!value) delete edge.path.display.dataset[key]
              else edge.path.display.dataset[key] = value
            }
        }
      }
    ))
  }
}