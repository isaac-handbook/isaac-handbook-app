type Notice = {
  title: string;
  content?: string[];
  extra?: Record<string, any>;
};

export type UpdateInfo = Record<
  ['notices', 'features', 'bugs', 'btns'][number],
  Notice[]
>;
