import * as fz from "../converters/fromZigbee";
import * as tz from "../converters/toZigbee";
import * as exposes from "../lib/exposes";
import * as m from "../lib/modernExtend";
import * as reporting from "../lib/reporting";
import type {DefinitionWithExtend} from "../lib/types";

const e = exposes.presets;

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ["HDC52EastwindFan", "HBUniversalCFRemote"],
        model: "99432",
        vendor: "Hampton Bay",
        description: "Universal wink enabled white ceiling fan premier remote control",
        fromZigbee: [fz.fan],
        toZigbee: [tz.fan_mode],
        exposes: [e.fan().withState("fan_state").withModes(["low", "medium", "high", "on", "smart"])],
        meta: {disableDefaultResponse: true},
        extend: [m.light({configureReporting: true}), m.forcePowerSource({powerSource: "Mains (single phase)"})],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["hvacFanCtrl"]);
            await reporting.fanMode(endpoint);
        },
    },
    {
        zigbeeModel: ["ETI 12-in Puff light"],
        model: "54668161",
        vendor: "Hampton Bay",
        description: "12 in. LED smart puff",
        extend: [m.light({colorTemp: {range: undefined}})],
    },
];
