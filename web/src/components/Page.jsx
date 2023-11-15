import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

const Page = forwardRef(({children, title, meta, ...other}, ref) => (
    <>
      <Helmet>
        <title>{`${title}`}</title>
      </Helmet>

      <div ref={ref} {...other}>
         {children}
      </div>
    </>
))

export default Page;