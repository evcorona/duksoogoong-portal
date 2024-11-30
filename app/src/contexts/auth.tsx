import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode } from "react";

type TokenPayload = {
  userId: string;
  role: "student" | "tutor" | "teacher" | "admin" | "main";
  isInitialSetup: string;
  schoolId: string;
};

type IUseAuth = {
  tokenPayload: TokenPayload;
  redirectionAfterLogin: () => void;
  validateAuth: () => void;
};

export default function useAuth() {
  const { push } = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  const token = sessionStorage.getItem("DSG");

  if (!token) {
    return {
      userId: "",
      role: "",
      isInitialSetup: "",
      schoolId: "",
    };
  }

  const tokenPayload = JSON.parse(atob(token.split(".")[1])) as TokenPayload;

  const redirectionAfterLogin = () => {
    switch (tokenPayload.role) {
      case "main":
        push("/schools");
        break;
      case "admin":
        push("/schools");
        break;
      case "teacher":
        push(
          `/schools/${tokenPayload.schoolId}/teachers/${tokenPayload.userId}`,
        );
        break;
      case "tutor":
        push(`/tutors/${tokenPayload.userId}`);
        break;
      case "student":
        push(
          `/schools/${tokenPayload.schoolId}/students/${tokenPayload.userId}`,
        );
        break;
      default:
        break;
    }
  };

  const validateAuth = () => !token && push("/login");

  return {
    tokenPayload,
    redirectionAfterLogin,
    validateAuth,
  };
}

export const AuthContext = createContext<IUseAuth>({} as IUseAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialState = useAuth();

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};
