import React from 'react';

function ResetPassControls (props) {
  const {
    isResetPasswordForm,
    openResetPasswordForm
  } = props;

  return (
    <div className='reset-pass'>
      {
      !isResetPasswordForm
        ? <>
          <span className='reset-pass__label'>Forgot your password?&nbsp;</span>
          <div
            className='reset-pass__action'
            onClick={openResetPasswordForm}
          >Reset it here.
          </div>
          </>
        : <div
            className='reset-pass__action'
            onClick={openResetPasswordForm}
          >Back to login.
        </div>
    }
    </div>
  );
}

export default ResetPassControls;
