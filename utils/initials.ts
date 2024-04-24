export function generateInitials(firstName:any, lastName:any) {
  const firstInitial = firstName?.charAt(0).toUpperCase();
  const lastInitial = lastName?.charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
}