#map-props
---
[![NPM Version](https://img.shields.io/npm/v/map-props.svg?style=flat-square)](https://www.npmjs.com/package/map-props) 
[![NPM Downloads](https://img.shields.io/npm/dm/map-props.svg?style=flat-square)](https://www.npmjs.com/package/map-props)
[![Build Status](https://img.shields.io/travis/erikras/map-props/master.svg?style=flat-square)](https://travis-ci.org/erikras/map-props)
[![devDependency Status](https://david-dm.org/erikras/map-props/dev-status.svg)](https://david-dm.org/erikras/map-props#info=devDependencies)

`map-props` wraps a React component and allows mapping prop values passed in to other prop values expected by 
the wrapped component.

---

## Installation

```
npm install --save map-props
```

## Release Notes

This project follows [SemVer](http://semver.org) and each release is posted on the 
[Release Notes](https://github.com/erikras/map-props/releases) page.

## Example

```javascript
import React, {Component, PropTypes} from 'react';
import mapProps from 'map-props';

class UserProfile extends Component {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }
  
  render() {
    const {firstName, lastName} = this.props;
    return <div className="user-profile">{firstName} {lastName}</div>;
  }
}

// wrap this component to create a component that expects only a fullName prop
UserProfile = mapProps({
  firstName: props => props.fullName.split(' ')[0],
  lastName: props => props.fullName.split(' ')[1]
})(UserProfile);

export default UserProfile;
```

Then render this component:

```javascript
<UserProfile fullName="Bobby Tables"/>
```

## Benefits

By mapping props using a Higher Order Component, you can increase the reusability of other "dumb"
(pure and stateless) components.

## Complimentary

This library was inspired by, and intended to be used in conjunction with [`redux`](https://github.com/rackt/redux),
[`reselect`](https://github.com/faassen/reselect) and [`redux-form`](https://github.com/erikras/redux-form),
although it does not depend on any of those libraries and can be used in any React-based project.

## ES7 Decorator Sugar

Using [ES7 decorator proposal](https://github.com/wycats/javascript-decorators), the example above
could be written as:

```javascript
@mapProps({
  firstName: props => props.fullName.split(' ')[0],
  lastName: props => props.fullName.split(' ')[1]
})
export default class UserProfile extends Component {
```

You can enable ES7 decorators with [Babel Stage 1](http://babeljs.io/docs/usage/experimental/). Note
that decorators are experimental, and this syntax might change or be removed later.

## API

### `mapProps(mapping:Object)`

##### -`mapping : Object`

> a mapping from `propName` to a function that takes all the props and produces the value to pass
to the wrapped component as `propName`.

This is an extremely young library, so the API may change. Comments and feedback welcome.
