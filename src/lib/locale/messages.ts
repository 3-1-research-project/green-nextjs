const flashMessages = {
    registrationSuccess: "You were successfully registered and can login now",
    loginSuccess: "You were logged in",
    logoutSuccess: "You were logged out",
    followSuccess: (username: string) => `You are now following ${username}`,
    unfollowSuccess: (username: string) => `You are no longer following ${username}`,
    tweetSuccess: "Your message was recorded",
  };
  
  export default flashMessages;