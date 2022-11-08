import type NavbarType from '@theme/Navbar';
import type { WrapperProps } from '@docusaurus/types';
import React from 'react';
import Navbar from '@theme-original/Navbar';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
  return (
    <>
      <Navbar {...props} />
    </>
  );
}
