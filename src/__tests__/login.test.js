import { login } from "../js/api/auth/login";
import { save } from "../js/storage";
import { apiPath } from "../js/api/constants";

global.fetch = jest.fn();

jest.mock("../js/storage", () => ({
  save: jest.fn(),
  load: jest.fn(),
}));

describe("login function", () => {
  const mockEmail = "thu@example.com";
  const mockPassword = "1234567890";
  const mockAccessToken = { accessToken: "1234567890987654321" };
  const mockProfile = { id: 123, name: "Thu Huynh" };
  const mockResult = {
    ...mockAccessToken,
    ...mockProfile,
  };

  beforeEach(() => {
    fetch.mockClear();
    save.mockClear();
  });

  it("should store a token when provided with valid credentials", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockResult),
    };

    fetch.mockResolvedValue(mockResponse);

    await login(mockEmail, mockPassword);

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({ email: mockEmail, password: mockPassword }),
      headers: { "Content-Type": "application/json" },
    });

    expect(save).toHaveBeenCalledWith("token", mockAccessToken.accessToken);
  });

  it("should store and return the profile", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockResult),
    };

    fetch.mockResolvedValue(mockResponse);

    const profile = await login(mockEmail, mockPassword);

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({ email: mockEmail, password: mockPassword }),
      headers: { "Content-Type": "application/json" },
    });

    expect(save).toHaveBeenCalledWith("profile", mockProfile);
    expect(profile).toEqual(mockProfile);
  });

  it("should throw an error if the login fails", async () => {
    const mockResponse = {
      ok: false,
      statusText: "Unauthorized",
    };

    fetch.mockResolvedValue(mockResponse);

    expect(login(mockEmail, mockPassword)).rejects.toThrow("Unauthorized");
    expect(save).not.toHaveBeenCalled();
  });
});
