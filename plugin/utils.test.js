jest.mock('./package.json', () => ({
  version: '0.1.6',
}));
jest.mock('gatsby/package.json', () => ({
  version: '0.4.10',
}));

import { getResourceOptions, generateCloudinaryUrl } from './utils';

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

describe('generateCloudinaryUrl', () => {
  const ANALYTICS_CODE = 'AXOrEGQ0';
  describe('generates correct url for image', () => {
    it('for secure is true', () => {
      const asset = {
        public_id: 'public-id',
        cloud_name: 'cloud-name',
      };

      const secureUrl = generateCloudinaryUrl(asset, { secure: true });
      expect(secureUrl).toBe(
        `https://res.cloudinary.com/cloud-name/image/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
      );
    });

    it('for secure is false', () => {
      const asset = {
        public_id: 'public-id',
        cloud_name: 'cloud-name',
      };

      const url = generateCloudinaryUrl(asset, { secure: false });
      expect(url).toBe(
        `http://res.cloudinary.com/cloud-name/image/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
      );
    });

    it('for custom cname and secure is false', () => {
      const asset = {
        public_id: 'public-id',
        cloud_name: 'cloud-name',
      };

      const url = generateCloudinaryUrl(asset, {
        secure: false,
        cname: 'example.com',
      });
      expect(url).toBe(
        `http://example.com/cloud-name/image/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
      );
    });

    it('for custom cname and secure is true', () => {
      const asset = {
        public_id: 'public-id',
        cloud_name: 'cloud-name',
      };

      const url = generateCloudinaryUrl(asset, {
        secure: true,
        secure_distribution: 'example.com',
      });
      expect(url).toBe(
        `https://example.com/cloud-name/image/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
      );
    });

    it('for custom secure_distribution (cname) and secure is true', () => {
      const asset = {
        public_id: 'public-id',
        cloud_name: 'cloud-name',
      };

      const url = generateCloudinaryUrl(asset, {
        secure: true,
        secure_distribution: 'example.com',
      });
      expect(url).toBe(
        `https://example.com/cloud-name/image/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
      );
    });

    it('for private_cdn and secure is true', () => {
      const asset = {
        public_id: 'public-id',
        cloud_name: 'cloud-name',
      };

      const url = generateCloudinaryUrl(asset, {
        secure: true,
        private_cdn: true,
      });
      expect(url).toBe(
        `https://cloud-name-res.cloudinary.com/image/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
      );
    });

    it('for private_cdn and secure is false', () => {
      const asset = {
        public_id: 'public-id',
        cloud_name: 'cloud-name',
      };

      const url = generateCloudinaryUrl(asset, {
        secure: false,
        private_cdn: true,
      });
      expect(url).toBe(
        `http://cloud-name-res.cloudinary.com/image/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
      );
    });
  });

  // cname: ,
  //   secure_destination,
  //   private_cdn
  it('generates correct url for video', () => {
    const asset = {
      public_id: 'public-id',
      cloud_name: 'cloud-name',
      resource_type: 'video',
    };

    const secureUrl = generateCloudinaryUrl(asset, { secure: true });
    expect(secureUrl).toBe(
      `https://res.cloudinary.com/cloud-name/video/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
    );
    const url = generateCloudinaryUrl(asset, { secure: false });
    expect(url).toBe(
      `http://res.cloudinary.com/cloud-name/video/upload/f_auto,q_auto/public-id?_a=${ANALYTICS_CODE}`,
    );
  });
});
