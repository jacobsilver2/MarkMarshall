import { wrapRootElement as wrap } from "./rootWrapper"
//according to a stack overflow thread I found, using wrapPageElement instead of wrapRootElement works better with
//styled components and will get rid of the FOUC.
export const wrapPageElement = wrap
