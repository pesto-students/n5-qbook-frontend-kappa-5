import React from 'react';
import renderer from 'react-test-renderer';
import index from './index';

test('Properly Inde page data', () => {
  const component = renderer.create(<index></index>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})