/* @flow */
import reduce from 'lodash/reduce'

import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

export default function processStyleWithPlugins(
  renderer: DOMRenderer | NativeRenderer,
  style: Object,
  type: StyleType,
  props: Object = {}
) {
  if (renderer.plugins.length > 0) {
    return reduce(
      renderer.plugins,
      (processedStyle, plugin) => plugin(processedStyle, type, renderer, props),
      style
    )
  }

  return style
}
