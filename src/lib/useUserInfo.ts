const FIRST_TIME_VISITOR_KEY = "first-time-visitor";

export default function useUserInfo() {
  let isFirstTimeVisitor = false;

  if (localStorage.getItem(FIRST_TIME_VISITOR_KEY) === null) {
    localStorage.setItem(FIRST_TIME_VISITOR_KEY, "false");
    isFirstTimeVisitor = true;
  }

  return {
    isFirstTimeVisitor,
  };
}
