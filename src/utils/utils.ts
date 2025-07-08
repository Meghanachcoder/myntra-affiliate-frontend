export const logHelper = (tag: any = "", sign: any = "", message: any = "") => {
  console.log( '🟢' + tag, sign, message);
};

export const setUserDetails = (userDetails: any) => {

  localStorage.setItem('auth_token', userDetails?.accessToken);
  localStorage.setItem('refresh_token', userDetails?.refreshToken);
  localStorage.setItem('user_details', JSON.stringify(userDetails?.user));

};

export const dateFormatter = (date: string) => {

  if (!date) return "";

  if( new Date(date).toString() === "Invalid Date" ) return "Invalid Date";

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
};