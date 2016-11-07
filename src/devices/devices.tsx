import * as React from "react";
import { connect } from "react-redux";
import { Navbar } from "../nav/navbar";
import { ToggleButton } from "../controls/toggle_button";
import { BotLog, BotState } from "../devices/interfaces";
import * as moment from "moment";
import { Everything } from "../interfaces";
import {
    saveAccountChanges,
    changeDevice,
    addDevice,
    settingToggle,
    changeSettingsBuffer,
    changeConfigBuffer,
    commitSettingsChanges,
    checkControllerUpdates,
    reboot,
    powerOff,
    checkArduinoUpdates,
    clearLogs,
    updateConfig
} from "./actions";
import { t } from "i18next";
import * as _ from "lodash";

interface UpdateButtonProps {
    bot: BotState;
}

let OsUpdateButton = ({bot}: UpdateButtonProps) => {
    let osUpdateBool = bot.hardware.configuration.os_auto_update;
    let buttonStr = "Can't Connect to bot";
    let buttonColor = "yellow";
    if (bot.currentOSVersion != undefined) {
        if (bot.currentOSVersion === bot.hardware.informational_settings.controller_version) {
            buttonStr = t("Controller Up to date!");
            buttonColor = "gray";
        } else {
            buttonStr = t("Controller Update Available!");
            buttonColor = "green";
        }
    } else {
        buttonStr = "Can't Connect to release server";
    }
    return (
        <div>
            <button className={"button-like " + buttonColor}
                onClick={() => checkControllerUpdates()}>
                {buttonStr}
            </button >
            <p> {t("OS Auto Updates")}
                <ToggleButton toggleval=
                    {String(osUpdateBool) || "undefined"}
                    toggleAction={() => { updateConfig({ os_auto_update: !osUpdateBool }); } } />
            </p>
        </div>
    );
};

let FwUpdateButton = ({bot}: UpdateButtonProps) => {
    let fwUpdateBool = bot.hardware.configuration.fw_auto_update;
    let buttonStr = "Can't Connect to bot";
    let buttonColor = "yellow";
    if (bot.currentFWVersion != undefined) {
        if (bot.currentFWVersion == (bot.hardware.mcu_params.param_version || "").toString()) {
            buttonStr = t("Firmware Up to date!");
            buttonColor = "gray";
        } else {
            buttonStr = t("Firmware Update Available!");
            buttonColor = "green";
        }
    }
    return (
        <div>
            <button className={"button-like " + buttonColor}
                onClick={() => checkArduinoUpdates()}>
                {buttonStr}
            </button >
            <p> {t("OS Auto Updates")}
                <ToggleButton toggleval=
                    {String(fwUpdateBool) || "undefined"}
                    toggleAction={() => { updateConfig({ fw_auto_update: !fwUpdateBool }); } } />
            </p>
        </div>);
};

export class ConfigInputBox extends React.Component<any, any> {
    primary() {
        return this.props.bot.configBuffer[this.props.setting];
    }
    secondary() {
        let num = this.props.bot.hardware.configuration[this.props.setting];
        if (_.isNumber(num)) {
            return String(num); // Prevent 0 from being falsy.
        } else {
            return num;
        }
    }

    style() {
        return {
            border: (this.primary()) ? "1px solid red" : ""
        };
    }

    change(key: string, dispatch: Function) {
        return function (event: React.FormEvent<HTMLInputElement>) {
            let formInput = event.currentTarget.value;
            dispatch(changeConfigBuffer({ [key]: Number(formInput) }));
        };
    }

    render() {
        return (
            <input type="text"
                style={this.style()}
                onChange={this.change(this.props.setting, this.props.dispatch)}
                value={this.primary() || this.secondary() || "---"} />);
    }
}

export class McuInputBox extends React.Component<any, any> {

    primary() {
        return this.props.bot.settingsBuffer[this.props.setting];
    }
    secondary() {
        let num = this.props.bot.hardware.mcu_params[this.props.setting];
        if (_.isNumber(num)) {
            return String(num); // Prevent 0 from being falsy.
        } else {
            return num;
        }
    }

    style() {
        return {
            border: (this.primary()) ? "1px solid red" : ""
        };
    }

    change(key: any, dispatch: Function) {
        return function (event: React.FormEvent<HTMLInputElement>) {
            let formInput = event.currentTarget.value;
            dispatch(changeSettingsBuffer(key, formInput));
        };
    }

    render() {
        return (
            <td>
                <input type="text"
                    style={this.style()}
                    onChange={this.change(this.props.setting, this.props.dispatch)}
                    value={this.primary() || this.secondary() || "---"} />
            </td>);
    }
}

// TODO HACK : This is the biggest refactor target in the app right now.
// Numerous issues: uses local variables instead of component state, references
// Farmbot object and Redux .bot property (redundant).
class DevicesPage extends React.Component<Everything, any> {

    updateBot(e: React.MouseEvent<{}>) {
        this.props.dispatch(saveAccountChanges);
    }

    changeBot(e: React.MouseEvent<HTMLInputElement>) {
        e.preventDefault();
        console.warn("If you are reading this method, refactor NOW! -RC");
        let updates =
            _.object([[e.currentTarget.name, e.currentTarget.value]]);
        this.props.dispatch(changeDevice(updates));
    }

    saveBot(e: React.MouseEvent<{}>) {
        // THIS IS THE CAUSE OF THE "STALE DATA" BUG: Fix me!
        e.preventDefault();
        let form = this.props.bot.account;
        this.props.dispatch(addDevice(form));
    }

    render() {

        return (
            <div>
                <Navbar { ...this.props } />
                <div className="all-content-wrapper">
                    <div>
                        <div className="row">
                            <div className="col-md-5 col-sm-6 col-xs-12 col-md-offset-1">
                                <div>
                                    <div className="widget-wrapper">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <form onSubmit={this.saveBot.bind(this)}>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <button type="submit"
                                                                className="button-like green widget-control"
                                                                onClick={this.updateBot.bind(this)}>
                                                                {t("SAVE")} {this.props.bot.account.dirty ? "*" : ""}
                                                            </button>
                                                            <div className="widget-header">
                                                                <h5>{t("DEVICE")}</h5>
                                                                <i className="fa fa-question-circle widget-help-icon">
                                                                    <div className="widget-help-text">
                                                                        {t(`This widget shows device information.`)}
                                                                    </div>
                                                                </i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="widget-content">
                                                                <table className="plain">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <label>{t("FARMBOT NAME")}</label>
                                                                            </td>
                                                                            <td colSpan={2}>
                                                                                <input name="name"
                                                                                    onChange={this.changeBot.bind(this)}
                                                                                    value={this.props.bot.account.name} />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <label>{t("NETWORK")}</label>
                                                                            </td>
                                                                            <td colSpan={2}>
                                                                                <p> {t("MQTT: {{mqtt_server}}",
                                                                                    { mqtt_server: this.props.auth.mqtt })} </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <label>{t("CONTROLLER")}</label>
                                                                            </td>
                                                                            <td>
                                                                                <p>
                                                                                    {String(this.props.bot.hardware
                                                                                        .informational_settings.controller_version)
                                                                                        || t("Not Connected to bot")}
                                                                                </p>
                                                                            </td>
                                                                            <td>
                                                                                <OsUpdateButton { ...this.props } />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <label>{t("FIRMWARE")}</label>
                                                                            </td>
                                                                            <td>
                                                                                <p>
                                                                                    {t("Version")} {
                                                                                        String(this.props.bot.hardware.mcu_params.param_version)
                                                                                        || t("Not Connected to bot")
                                                                                    }
                                                                                </p>
                                                                            </td>
                                                                            <td>
                                                                                <FwUpdateButton { ...this.props } />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <label>{t("RESTART FARMBOT")} </label>
                                                                            </td>
                                                                            <td>
                                                                                <p>
                                                                                    {t(`This will restart FarmBot's Raspberry
                                            Pi and controller software`)}
                                                                                </p>
                                                                            </td>
                                                                            <td>
                                                                                <button type="button"
                                                                                    className="button-like yellow"
                                                                                    onClick={reboot}>
                                                                                    {t("RESTART")}
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <label>{t("SHUTDOWN FARMBOT")}</label>
                                                                            </td>
                                                                            <td>
                                                                                <p>
                                                                                    {t(`This will shutdown FarmBot's Raspberry Pi.
                                              To turn it back on, unplug FarmBot
                                              and plug it back in.`)}
                                                                                </p>
                                                                            </td>
                                                                            <td>
                                                                                <button type="button"
                                                                                    className="button-like red"
                                                                                    onClick={powerOff} >
                                                                                    {t("SHUTDOWN")}
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-6 col-xs-12">
                                <div>
                                    <div className="widget-wrapper">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <button className="green button-like widget-control"
                                                    onClick={() => this.props.dispatch(commitSettingsChanges())} >
                                                    {t("SAVE")}
                                                    {Object.keys(this.props.bot.settingsBuffer).length ? "*" : ""}
                                                </button>
                                                <div className="widget-header">
                                                    <h5>Hardware</h5>
                                                    <i className="fa fa-question-circle widget-help-icon">
                                                        <div className="widget-help-text">
                                                            {t(`Change settings
                            of your FarmBot hardware with the fields below.
                            Caution: Changing these settings to extreme
                            values can cause hardware malfunction. Make
                            sure to test any new settings before letting
                            your FarmBot use them unsupervised. Tip: Recalibrate
                            FarmBot after changing settings and test a few sequences
                            to verify that everything works as expected. Note:
                            Currently not all settings can be changed.`)}
                                                        </div>
                                                    </i>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        {t("STEPS PER MM")}
                                                        <ConfigInputBox setting="steps_per_mm" {...this.props} />
                                                        <table className="plain">
                                                            <thead>
                                                                <tr>
                                                                    <th width="32%" />
                                                                    <th width="22%">
                                                                        <label>{t("X AXIS")}</label>
                                                                    </th>
                                                                    <th width="22%">
                                                                        <label>{t("Y AXIS")}</label>
                                                                    </th>
                                                                    <th width="22%">
                                                                        <label>{t("Z AXIS")}</label>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("MAX SPEED (mm/s)")}</label>
                                                                    </td>
                                                                    <McuInputBox setting="movement_max_spd_x" {...this.props} />
                                                                    <McuInputBox setting="movement_max_spd_y" {...this.props} />
                                                                    <McuInputBox setting="movement_max_spd_z" {...this.props} />
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("ACCELERATE FOR (steps)")}</label>
                                                                    </td>
                                                                    <McuInputBox setting="movement_steps_acc_dec_x"
                                                                        {...this.props} />
                                                                    <McuInputBox setting="movement_steps_acc_dec_y"
                                                                        {...this.props} />
                                                                    <McuInputBox setting="movement_steps_acc_dec_z"
                                                                        {...this.props} />
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("TIMEOUT AFTER (seconds)")}</label>
                                                                    </td>
                                                                    <McuInputBox setting="movement_timeout_x"
                                                                        {...this.props} />
                                                                    <McuInputBox setting="movement_timeout_y"
                                                                        {...this.props} />
                                                                    <McuInputBox setting="movement_timeout_z"
                                                                        {...this.props} />
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("LENGTH (m)")}</label>
                                                                    </td>
                                                                    <McuInputBox setting="movement_axis_nr_steps_x"
                                                                        {...this.props} />
                                                                    <McuInputBox setting="movement_axis_nr_steps_y"
                                                                        {...this.props} />
                                                                    <McuInputBox setting="movement_axis_nr_steps_z"
                                                                        {...this.props} />
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("CALIBRATION")}</label>
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" className="button-like yellow">
                                                                            {t("CALIBRATE X")}
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" className="button-like yellow">
                                                                            {t("CALIBRATE Y")}
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" className="button-like yellow">
                                                                            {t("CALIBRATE Z")}
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("INVERT ENDPOINTS")}</label>
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_invert_endpoints_x}
                                                                            toggleAction={() =>
                                                                                settingToggle("movement_invert_endpoints_x",
                                                                                    this.props.bot)} />
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_invert_endpoints_y}
                                                                            toggleAction={() =>
                                                                                settingToggle("movement_invert_endpoints_y",
                                                                                    this.props.bot)} />
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_invert_endpoints_z}
                                                                            toggleAction={() =>
                                                                                settingToggle("movement_invert_endpoints_z",
                                                                                    this.props.bot)} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("INVERT MOTORS")}</label>
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_invert_motor_x}
                                                                            toggleAction={() => settingToggle("movement_invert_motor_x", this.props.bot)} />
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_invert_motor_y}
                                                                            toggleAction={() => settingToggle("movement_invert_motor_y", this.props.bot)} />
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_invert_motor_z}
                                                                            toggleAction={() => settingToggle("movement_invert_motor_z", this.props.bot)} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <label>{t("ALLOW NEGATIVES")}</label>
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_home_up_x}
                                                                            toggleAction={() => settingToggle("movement_home_up_x", this.props.bot)} />
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_home_up_y}
                                                                            toggleAction={() => settingToggle("movement_home_up_y", this.props.bot)} />
                                                                    </td>
                                                                    <td>
                                                                        <ToggleButton
                                                                            toggleval={this.props.bot.hardware.mcu_params.movement_home_up_z}
                                                                            toggleAction={() => settingToggle("movement_home_up_z", this.props.bot)} />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
                                <div>
                                    <div className="widget-wrapper">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <button type="submit"
                                                            className="button-like green widget-control"
                                                            onClick={() => this.props.dispatch(clearLogs())}>
                                                            {t("Clear Logs")}
                                                        </button>
                                                        <div className="widget-header">
                                                            <h5>{t("Logs")}</h5>
                                                            <i className="fa fa-question-circle widget-help-icon">
                                                                <div className="widget-help-text">{t(`All messages from
                                your FarmBot are shown in these logs. Note: these
                                are not currently saved anywhere so if you refresh
                                the app this table will be cleared.`)}</div>
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th width="15%">
                                                                        <label>{t("TIME")}</label>
                                                                    </th>
                                                                    <th width="75%">
                                                                        <label>{t("MESSAGE")}</label>
                                                                    </th>
                                                                    <th width="10%">
                                                                        <label>{t("COORDINATES")}</label>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <Logs logs={this.props.bot.logQueue} />
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

interface LogsProps {
    logs: BotLog[];
}

function Logs({logs}: LogsProps) {
    function HasLogs(_: any) {
        function displayTime(t: number): string {
            return moment.unix(t).format("D MMM h:mma");
        }

        function displayCoordinates(log: BotLog) {
            // Stringify coords bcuz 0 is falsy in JS.
            let [x, y, z] = [log.status.location[0],
            log.status.location[1],
            log.status.location[2]].map((i) => String(i));
            if (x && y && z) {
                return `${x}, ${y}, ${z}`;
            } else {
                return "Unknown";
            }
        }


        return <tbody>
            {
                logs.map((log, i) => <tr key={i}>
                    <td> {displayTime(log.time)} </td>
                    <td> {log.message} </td>
                    <td> {displayCoordinates(log)} </td>
                </tr>)
            }
        </tbody>;
    }

    function NoLogs(_: any) {
        return <tbody>
            <tr>
                <td colSpan={3}>
                    <p>{t("No logs yet.")}</p>
                </td>
            </tr>
        </tbody>;
    }
    return (logs.length ? <HasLogs logs={logs} /> : <NoLogs />);
}

export let Devices = connect((state: Everything) => state)(DevicesPage);
