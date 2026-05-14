import Login from "../Components/Login"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { BrowserRouter } from "react-router-dom"

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        message: "Login successful ✅",
        user: {
          role: "user",
        },
      }),
  })
)

describe("Login Page Testing", () => {

  it("Should render login button", () => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const btn = screen.getByTestId("login-btn")

    expect(btn).toBeInTheDocument()
  })

  it("Should allow typing email", () => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const emailInput = screen.getByTestId("login-email")

    fireEvent.change(emailInput, {
      target: { value: "admin@gmail.com" },
    })

    expect(emailInput.value).toBe("admin@gmail.com")
  })

  it("Should allow typing password", () => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const passwordInput = screen.getByTestId("login-password")

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    })

    expect(passwordInput.value).toBe("123456")
  })

})
