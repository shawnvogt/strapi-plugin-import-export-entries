import { last } from "lodash"
import { Button } from '@strapi/design-system/Button';
import Upload from '@strapi/icons/Upload';
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import getTrad from '../../utils/getTrad';
import { ImportModal } from '../ImportModal';

export const Import = () => {
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();

  const [importVisible, setImportVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  
  const openImportModal = () => {
    setImportVisible(true);
  };
  
  const closeImportModal = () => {
    setImportVisible(false);
  };
  
  useEffect(() => {
    if (last(pathname.split('/')).startsWith("api::")) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  },[pathname])

  return (
    <>
      {buttonVisible && <Button startIcon={<Upload />} onClick={openImportModal}>
        {formatMessage({ id: getTrad('plugin.cta.import') })}
      </Button>}

      {importVisible && <ImportModal onClose={closeImportModal} />}
    </>
  );
};
