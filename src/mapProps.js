import React, {Component} from 'react';

export default function mapProps(mapping) {
  return DecoratedComponent =>
    class MapProps extends Component {
      static displayName = `MapProps(${getDisplayName(DecoratedComponent)})`;
      static DecoratedComponent = DecoratedComponent;

      render() {
        const mapped = {
          ...this.props,
          ...Object.keys(mapping).reduce((acc, key) => {
            return {
              ...acc,
              [key]: mapping[key](this.props)
            };
          }, {})
        };
        return <DecoratedComponent {...mapped}/>;
      }
    };
}
