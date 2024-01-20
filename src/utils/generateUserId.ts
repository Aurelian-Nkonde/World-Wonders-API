import ShortUniqueId from 'short-unique-id';

export function generateUserId() {
  const response = new ShortUniqueId({
    length: 20,
    dictionary: 'alphanum_lower',
  });
  return response.rnd();
}
