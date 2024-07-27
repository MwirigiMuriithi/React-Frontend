function maskEmail(email) {
  const [user, domain] = email.split("@");
  const maskedUser = user.slice(0, 2) + "****" + user.slice(-2);
  return `${maskedUser}@${domain}`;
}

export {
    maskEmail
}