import Joi from 'joi';
import { testPluginOptionsSchema } from 'gatsby-plugin-utils';
import { pluginOptionsSchema } from './gatsby-node';

describe('pluginOptionsSchema', () => {
  test('should validate minimal correct options', async () => {
    const options = {
      cloudName: 'cloudName',
      apiKey: 'apiKey',
      apiSecret: 'apiSecret',
    };

    const { isValid } = await testPluginOptionsSchema(
      pluginOptionsSchema,
      options,
    );

    expect(isValid).toBe(true);
  });

  test('should invalidate incorrect options', async () => {
    const options = {
      cloudName: 120,
      apiKey: '',
      resourceType: '',
      type: 30,
      maxResults: '',
      resultsPerPage: 'hello',
      tags: 'world',
      prefix: 800,
      context: '',
      secure: 'not a boolean',
      cname: 2,
      secureDistribution: 3,
      privateCdn: 'not a boolean',
    };

    const { isValid, errors } = await testPluginOptionsSchema(
      pluginOptionsSchema,
      options,
    );

    expect(isValid).toBe(false);
    expect(errors).toEqual([
      `"cloudName" must be a string`,
      `"apiKey" is not allowed to be empty`,
      `"apiSecret" is required`,
      `"resourceType" is not allowed to be empty`,
      `"type" must be a string`,
      `"maxResults" must be a number`,
      `"resultsPerPage" must be a number`,
      `"tags" must be a boolean`,
      `"prefix" must be a string`,
      `"context" must be a boolean`,
      `"secure" must be a boolean`,
      `"cname" must be a string`,
      `"secureDistribution" must be a string`,
      `"privateCdn" must be a boolean`,
    ]);
  });

  test('should add defaults', async () => {
    const schema = pluginOptionsSchema({ Joi });
    const options = {
      cloudName: 'cloudName',
      apiKey: 'apiKey',
      apiSecret: 'apiSecret',
    };
    const { value } = schema.validate(options);

    expect(value).toEqual({
      ...options,
      resourceType: 'image',
      maxResults: 10,
      resultsPerPage: 10,
      tags: false,
      secure: true,
      privateCdn: false,
    });
  });
});
