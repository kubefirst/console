import { Meta, StoryObj } from '@storybook/react';

import { Content } from '../../types/algolia/content';

import ContentHit from './ContentHit';

const meta: Meta<typeof ContentHit> = {
  component: ContentHit,
};

export default meta;

const mockContent: Content = {
  categories: ['all', 'the', 'stuff'],
  duration: 0.5,
  id: '1',
  imageUrl:
    'https://media.istockphoto.com/id/1323724812/vector/comic-lettering-wtf-on-creative-abstract.jpg?s=612x612&w=0&k=20&c=kzlrElwkjQafO7PUOc27onvpo0agELM3-uFSjFFKcsE=',
  likeCount: 1,
  objectID: '23e123wdqwef',
  publishedAt: 1693932566,
  title: 'Nice',
  viewCount: 1,
};

export const Default: StoryObj<typeof ContentHit> = { args: { hit: mockContent } };
