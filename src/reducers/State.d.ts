/** Common **/
export interface List<T> {
    items: T[]
}
export interface Paging<T> {
    items: T[];
    itemCount: number;
    pageCount: number;
    pageRange: number;
    pageIndex: number;
}
/** Root **/
export interface Store {
    signinPage: SignInPage;
    masterPage: MasterPage;
    landingPage: LandingPage;
    settingPage: SettingPage;
}
/** UI **/
export interface SignInPage {
    isUsernameAndPasswordValid: boolean;
    isSignInButtonLoading: boolean;
}
export interface MasterPage {
    isLockWindowVisible: boolean;
    path?: string;
}
export interface LandingPage {
    contributors: Contributor[];
}
export interface SettingPage {
    lang: string;
}
/** Biz **/
export interface Contributor {
    name: string;
    avatar: Avatar
}
export interface Avatar {
    url: string
}