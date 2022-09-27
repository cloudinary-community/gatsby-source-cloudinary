import { getResourceOptions } from './utils';

describe('getResourceOptions', () => {
  it('transforms options to snake case', () => {
    const result = getResourceOptions({
      resourceType: 'image',
      prefix: 'demo/examples',
      maxResults: 50,
    });

    const expected = {
      resource_type: 'image',
      prefix: 'demo/examples',
      max_results: 50,
      results_per_page: 50,
      type: 'upload',
    };

    expect(result).toEqual(expected);
  });
});
