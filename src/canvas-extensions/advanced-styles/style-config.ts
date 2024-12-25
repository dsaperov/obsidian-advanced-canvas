import { CanvasNodeType } from "src/@types/Canvas"

export interface StyleAttributeOption {
  icon: string
  label: string
  value: string | null // The element with the null value is the default
}

export interface StyleAttribute {
  datasetKey: string
  label: string
  nodeTypes?: CanvasNodeType[]
  options: StyleAttributeOption[]
}

export const BUILTIN_NODE_STYLE_ATTRIBUTES = [
  {
    datasetKey: 'textAlign',
    label: 'Text alignment',
    nodeTypes: ['text'],
    options: [
      {
        icon: 'align-left',
        label: 'Left (default)',
        value: null
      },
      {
        icon: 'align-center',
        label: 'Center',
        value: 'center'
      },
      {
        icon: 'align-right',
        label: 'Right',
        value: 'right'
      }
    ]
  },
  {
    datasetKey: 'shape',
    label: 'Shape',
    nodeTypes: ['text'],
    options: [
      {
        icon: 'rectangle-horizontal',
        label: 'Round Rectangle (default)',
        value: null
      },
      {
        icon: 'shape-pill',
        label: 'Pill',
        value: 'pill'
      },
      {
        icon: 'diamond',
        label: 'Diamond',
        value: 'diamond'
      },
      {
        icon: 'shape-parallelogram',
        label: 'Parallelogram',
        value: 'parallelogram'
      },
      {
        icon: 'circle',
        label: 'Circle',
        value: 'circle'
      },
      {
        icon: 'shape-predefined-process',
        label: 'Predefined Process',
        value: 'predefined-process'
      },
      {
        icon: 'shape-document',
        label: 'Document',
        value: 'document'
      },
      {
        icon: 'shape-database',
        label: 'Database',
        value: 'database'
      }
    ]
  },
  {
    datasetKey: 'border',
    label: 'Border',
    options: [
      {
        icon: 'border-solid',
        label: 'Solid (default)',
        value: null
      },
      {
        icon: 'border-dashed',
        label: 'Dashed',
        value: 'dashed'
      },
      {
        icon: 'border-dotted',
        label: 'Dotted',
        value: 'dotted'
      },
      {
        icon: 'eye-off',
        label: 'Invisible',
        value: 'invisible'
      }
    ]
  }
] as StyleAttribute[]

export const BUILTIN_EDGE_STYLE_ATTRIBUTES = [
  {
    datasetKey: 'path',
    label: 'Path style',
    options: [
      {
        icon: 'path-solid',
        label: 'Solid (default)',
        value: null
      },
      {
        icon: 'path-dotted',
        label: 'Dotted',
        value: 'dotted'
      },
      {
        icon: 'path-short-dashed',
        label: 'Short Dashed',
        value: 'short-dashed'
      },
      {
        icon: 'path-long-dashed',
        label: 'Long Dashed',
        value: 'long-dashed'
      }
    ]
  },
  {
    datasetKey: 'arrow',
    label: 'Arrow style',
    options: [
      {
        icon: 'arrow-triangle',
        label: 'Triangle (default)',
        value: null
      },
      {
        icon: 'arrow-triangle-outline',
        label: 'Triangle outline',
        value: 'triangle-outline'
      },
      {
        icon: 'arrow-thin-triangle',
        label: 'Thin triangle',
        value: 'thin-triangle'
      },
      {
        icon: 'arrow-halved-triangle',
        label: 'Halved triangle',
        value: 'halved-triangle'
      },
      {
        icon: 'arrow-small-triangle',
        label: 'Small triangle',
        value: 'small-triangle'
      },
      {
        icon: 'arrow-diamond',
        label: 'Diamond',
        value: 'diamond'
      },
      {
        icon: 'arrow-diamond-outline',
        label: 'Diamond outline',
        value: 'diamond-outline'
      },
      {
        icon: 'arrow-circle',
        label: 'Circle',
        value: 'circle'
      },
      {
        icon: 'arrow-circle-outline',
        label: 'Circle outline',
        value: 'circle-outline'
      },
      {
        icon: 'arrow-circle-to-triangle',
        label: 'Circle -> Triangle',
        value: 'circle-to-triangle'
      },
      {
        icon: 'arrow-circle-outline-to-triangle',
        label: 'Circle outline -> Triangle',
        value: 'circle-outline-to-triangle'
      }
    ]
  },
  {
    datasetKey: 'pathfindingMethod',
    label: 'Pathfinding method',
    options: [
      {
        icon: 'pathfinding-method-bezier',
        label: 'Bezier (default)',
        value: null
      },
      {
        icon: 'slash',
        label: 'Direct',
        value: 'direct'
      },
      {
        icon: 'pathfinding-method-square',
        label: 'Square',
        value: 'square'
      },
      {
        icon: 'map',
        label: 'A*',
        value: 'a-star'
      }
    ]
  }
] as StyleAttribute[]