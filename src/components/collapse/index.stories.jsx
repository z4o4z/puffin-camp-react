/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import Button from './index';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('with text', () => <Button opened={boolean('opened', false)} />);
