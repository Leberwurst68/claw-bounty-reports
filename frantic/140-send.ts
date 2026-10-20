import { Nitrosend } from '@nitrosend/sdk';

async function main(): Promise<void> {
  const apiKey: string | undefined = process.env.NITROSEND_API_KEY;
  if (!apiKey) {
    throw new Error('NITROSEND_API_KEY is not set');
  }
  const ns = new Nitrosend(apiKey);
  const message = await ns.messages.send(
    {
      channel: 'email',
      to: 'proof@dogfood.nitrosend.net',
      subject: 'sdk.send',
      body: 'SDK send from a 30-line TypeScript script. Nitrosend SDK 0.11.6, Node 24.21.0.',
    },
    `claw-sdk-${Date.now()}`,
  );
  console.log(JSON.stringify({ id: message.id, status: message.status, to: message.to }));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
