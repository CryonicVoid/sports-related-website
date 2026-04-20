import { html, fixture, expect } from '@open-wc/testing';
import "../sports-related-website.js";

describe("SportsRelatedWebsite test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <sports-related-website
        title="title"
      ></sports-related-website>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
