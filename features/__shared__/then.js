import expect from 'expect';

export default function({ Then }) {
  Then('Robert’s balance should be ${int}', async function(int) {
    expect(await this.getBalance()).toBe(int);
  });
}
