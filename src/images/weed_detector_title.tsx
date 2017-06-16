import * as React from "react";
import { t } from "i18next";
import { additionalSettingsMenu } from "./weed_detector_config";
import { WidgetHeader } from "../ui/index";

interface Props {
  onSave?(): void;
  onTest?(): void;
  onSettingToggle?(): void;
  onDeletionClick?(): void;
  onCalibrate?(): void;
  deletionProgress?: string | undefined;
  settingsMenuOpen?: boolean;
  title: string;
  help: string;
}

export function TitleBar({
  onSave,
  onTest,
  settingsMenuOpen,
  onSettingToggle,
  deletionProgress,
  onDeletionClick,
  onCalibrate,
  title,
  help
}: Props) {
  return <WidgetHeader helpText={help} title={title}>
    <button
      hidden={!onSave}
      onClick={onSave}
      className="green">
      {t("SAVE")}
    </button>
    <button
      hidden={!onTest}
      onClick={onTest}
      className="yellow">
      {t("TEST")}
    </button>
    <button
      hidden={!onDeletionClick}
      onClick={onDeletionClick}
      className="red">
      {deletionProgress || t("CLEAR WEEDS")}
    </button>
    {/* TODO: Hook up calibration */}
    <button
      hidden={!onCalibrate}
      onClick={() => { }}
      className="green">
      {t("Calibrate")}
    </button>
    {onSettingToggle &&
      <i
        onClick={onSettingToggle}
        className="fa fa-cog" >
        {settingsMenuOpen && additionalSettingsMenu()}
      </i>
    }
  </WidgetHeader>;
}
