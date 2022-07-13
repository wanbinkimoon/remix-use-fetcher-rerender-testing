import { json } from '@remix-run/node';

export let loader = () =>
  json({
    id: 1,
  });
