/** I would rather not deal with all the weird edge cases that come with
 * supporting strings and numbers right now. It adds too many edge cases for the
 * FE to validate against. When we need to support text that users will read, I
 * can re-visit this.
 *
 * Please use Enums for now on weed detector.
 * SEE: https://docs.python.org/3/library/enum.html
 */
export enum SPECIAL_VALUES {
  FALSE = 0,
  TRUE = 1,
  TOP_LEFT = 2,
  TOP_RIGHT = 3,
  BOTTOM_LEFT = 4,
  BOTTOM_RIGHT = 5,
  X = 6,
  Y = 7
}

export type WeedDetectorENVKey =
  | "H_HI"
  | "H_LO"
  | "V_HI"
  | "V_LO"
  | "S_HI"
  | "S_LO"
  | "blur"
  | "morph"
  | "iterations"
  | "invert_hue_selection"
  | "camera_offset_x"
  | "camera_offset_y"
  | "coord_scale"
  | "calibration_object_separation"
  | "total_rotation_angle"
  | "calibration_along_axis"
  | "image_bot_origin_location";

/** THIS IS WHAT THE STATE LOOKS LIKE ON FARMBOT'S END.
 * Keep this interface up to date
 * */
export type WeedDetectorENV = Record<WeedDetectorENVKey, number>;


