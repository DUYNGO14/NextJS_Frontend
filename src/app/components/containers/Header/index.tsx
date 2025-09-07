'use client';

import { AccountResType } from '@common/validation/account.schema';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { logoutAction, makeSelectAuthData } from '@/app/stores/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

export interface HeaderProps {
  user: AccountResType['data'] | null;
  token: string | null;
  pathname: string | null;
  handleLogout: () => void;
}

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const pathname = usePathname();
  const auth = useSelector(makeSelectAuthData);
  const token = auth?.token ?? null;
  const account = auth?.account ?? null;
  return (
    <>
      <HeaderDesktop
        user={account}
        token={token}
        pathname={pathname}
        handleLogout={handleLogout}
      />
      <HeaderMobile
        user={account}
        token={token}
        pathname={pathname}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;