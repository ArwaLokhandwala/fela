/* @flow */
import { render, rehydrate } from 'fela-dom'
import forEach from 'lodash/forEach'

function hasDOM(renderer) {
  return !renderer.isNativeRenderer && typeof window !== 'undefined'
}

export default function ProviderFactory(
  BaseComponent: any,
  renderChildren: Function,
  statics?: Object
): any {
  class Provider extends BaseComponent {
    constructor(props: Object, context: Object) {
      super(props, context)

      if (props.rehydrate && hasDOM(props.renderer)) {
        rehydrate(props.renderer)
      }
    }

    componentDidMount(): void {
      if (hasDOM(this.props.renderer)) {
        render(this.props.renderer)
      }
    }

    getChildContext(): Object {
      return {
        renderer: this.props.renderer,
      }
    }

    render(): Object {
      return renderChildren(this.props.children)
    }
  }

  if (statics) {
    forEach(statics, (value, key) => {
      Provider[key] = value
    })
  }

  return Provider
}
