import { last } from "lodash"
import { Button } from '@strapi/design-system/Button';
import Download from '@strapi/icons/Download';
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import getTrad from '../../utils/getTrad';
import { ExportModal } from '../ExportModal';

export const Export = () => {
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();

  const [exportVisible, setExportVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const openExportModal = () => {
    setExportVisible(true);
  };

  const closeExportModal = () => {
    setExportVisible(false);
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
      {buttonVisible && <Button startIcon={<Download />} onClick={openExportModal}>
        {formatMessage({ id: getTrad('plugin.cta.export') })}
      </Button>}

      {exportVisible && <ExportModal onClose={closeExportModal} />}
    </>
  );
};
