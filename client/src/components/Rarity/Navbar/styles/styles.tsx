import tw, { css } from 'twin.macro'

export const styles = {
  center: css`
    ${tw`flex justify-center`}
  `,
  navbarWrapper: css`
    ${tw`flex justify-between items-center px-2 py-8 whitespace-nowrap`}
  `,
  logo: css`
    ${tw`ml-0 sm:ml-8 `}
    font-size: calc(16px + (32 - 18) * ((100vw - 300px) / (1600 - 300)));
    user-select: none;
  `,
  search: css`
    flex: 0.5 0 auto;
  `,
  searchContainer: css`
    ${tw`text-sm sm:text-base flex mx-auto justify-center rounded-md`}
    @media (prefers-color-scheme:dark) {
      background-color: var(--secondary-dark);
      color: var(--secondary-light);
    }
    background-color: var(--secondary-light);
    color: var(--secondary-dark);
  `,
  input: css`
    ${tw`text-sm p-2 duration-75 ease-linear sm:w-5/6 w-3/4`}
    @media (prefers-color-scheme: dark) {
      background-color: var(--secondary-dark);
      color: var(--secondary-light);
    }
    background-color: var(--secondary-light);
    color: var(--secondary-dark);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    outline: 0 none;
    border-left: transparent 2px solid;
    border-top: transparent 2px solid;
    border-bottom: transparent 2px solid;
    :focus,
    :active {
      border-left: var(--main-theme) 2px solid;
      border-top: var(--main-theme) 2px solid;
      border-bottom: var(--main-theme) 2px solid;
    }
  `,
  inputButton: css`
    ${tw`flex justify-center items-center sm:w-1/6 w-1/4`}
    background-color: var(--main-theme);
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    &:hover {
      background-color: var(--hover-theme);

      transition: 75ms ease-in;
    }
  `,
  links: css`
    ${tw`sm:flex sm:items-center hidden`}
    img {
      opacity: 0.7;
      &:hover {
        opacity: 1;
        transition: 125ms ease-in;
        cursor: pointer;
      }
    }
    div {
      margin: 0 1.5rem;
    }
  `,
  wallet: css`
    ${tw`sm:mr-8`}
    img {
      min-width: 22px;
      width: 22px;
      height: auto;
    }
  `,
  walletContainer: css`
    ${tw`flex py-2 px-4 rounded-lg ease-linear duration-75 text-base items-center`}
    border: 0.25px solid var(--main-theme);
    &:hover {
      background-color: var(--hover-theme);
      cursor: pointer;
    }
  `,
}
