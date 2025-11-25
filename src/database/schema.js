import { tableSchema } from '@nozbe/watermelondb';

export const mySchema = {
  version: 1,
  tables: [
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'done', type: 'boolean' },
      ],
    }),
  ],
};
