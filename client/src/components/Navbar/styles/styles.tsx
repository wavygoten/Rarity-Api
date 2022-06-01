import tw, { css } from 'twin.macro'

export const styles = {
  navbarWrapper: css`
    ${tw`flex justify-between items-center px-2 py-8 whitespace-nowrap`}
  `,
  logo: css`
    ${tw`ml-0 sm:ml-8`}
  `,
  searchContainer: css`
    ${tw`text-sm sm:text-lg flex mx-auto justify-center rounded-md`}
  `,
  input: css`
    ${tw`p-2 duration-75 ease-linear sm:w-5/6 w-3/4`}
  `,
  inputButton: css`
    ${tw`flex justify-center items-center sm:w-1/6 w-1/4`}
  `,
  links: css`
    ${tw`sm:flex sm:items-center hidden`}
  `,
  wallet: css`
    ${tw`sm:mr-8`}
  `,
  walletContainer: css`
    ${tw`flex py-2 px-4 rounded-lg ease-linear duration-75 text-lg`}
  `,
}
