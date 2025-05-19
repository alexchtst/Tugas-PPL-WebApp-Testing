export function generateRefNum(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REF-MA${timestamp.slice(-4)}-${randomPart}`;
}
