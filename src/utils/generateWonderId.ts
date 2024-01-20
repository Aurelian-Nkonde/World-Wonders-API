import ShortUniqueId from 'short-unique-id';

export function generateWonderId() {
  const response = new ShortUniqueId({
    length: 15,
    dictionary: 'alphanum_lower',
  });
  return response.rnd();
}
