import { logout } from "../js/api/auth/logout";
import { remove } from "../js/storage";

jest.mock("../js/storage", () => ({
  remove: jest.fn(),
}));

describe("logout function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should remove the token and profile from storage", () => {
    logout();

    expect(remove).toHaveBeenCalledWith("token");
    expect(remove).toHaveBeenCalledWith("profile");
    expect(remove).toHaveBeenCalledTimes(2);
  });
});
