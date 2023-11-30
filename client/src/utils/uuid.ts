import { nanoid } from 'nanoid';

function getUUID() {
  let uuid = localStorage.getItem('user-UUID');

  if (!uuid) {
    uuid = nanoid();
    localStorage.setItem('user-UUID', uuid);
  }

  return uuid;
}

export { getUUID };
