
  import React from 'react';
  import Breadcrumbs from '@material-ui/core/Breadcrumbs';
  import Link from '@material-ui/core/Link';



  export function activeLastBreadcrumb(list,handleClick) {
    return (
      <Breadcrumbs aria-label="breadcrumb" style={{color:"blue", fontSize:"14px"}}>
        <Link color="inherit" href="/" onClick={handleClick}>
          {list[0]}
        </Link>
        <Link
          color="inherit"
          href="/"
          onClick={handleClick}
          aria-current="page"
        >
          {list[1]}
        </Link>
      </Breadcrumbs>
    );
  }