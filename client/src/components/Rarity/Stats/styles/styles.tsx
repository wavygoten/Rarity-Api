import tw, { css } from 'twin.macro'

export const styles = {
  center: css`
    ${tw`flex justify-center`}
  `,
  statsWrapper: css`
    ${tw`flex flex-wrap justify-center sm:justify-between px-2 py-12`}
  `,
  leftStack: css`
    ${tw`sm:mx-0 flex text-lg text-center mb-12 sm:mb-0`}
  `,
  rightStack: css`
    ${tw`sm:mx-0 flex items-center text-lg text-center `}
    span {
      margin: 0 2rem;
      display: flex;
      background: linear-gradient(var(--hover-theme) 0 0) var(--p, 100%) 100% /
        var(--d, 0) 2px no-repeat;
      &:hover {
        cursor: pointer;
        transition: 275ms, background-position 0s 0.3s;
        --d: 100%;
        --p: 0%;
      }
    }
    img {
      transition: 125ms ease-in;
      cursor: pointer;
    }
  `,
  leftHStack: css`
    ${tw`ml-0 sm:ml-8 mr-4 pl-4 sm:mr-8 sm:pl-8 border-l border-gray-500`}
  `,
}
