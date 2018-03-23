'use strict';

/**
 * Statistics for a {@link Track}.
 * @property {string} trackId - MediaStreamTrack ID
 * @property {number} timestamp - The Unix timestamp in milliseconds
 * @property {string} ssrc - SSRC of the MediaStreamTrack
 * @property {?number} packetsLost - Then number of packets lost
 * @property {?string} codec - Name of the codec used to encode the MediaStreamTrack's media
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackStats =
/**
 * @param {string} trackId - {@link Track} ID
 * @param {StandardizedTrackStatsReport} statsReport
 */
function TrackStats(trackId, statsReport) {
  _classCallCheck(this, TrackStats);

  if (typeof trackId !== 'string') {
    throw new Error('Track id must be a string');
  }

  Object.defineProperties(this, {
    trackId: {
      value: trackId,
      enumerable: true
    },
    timestamp: {
      value: statsReport.timestamp,
      enumerable: true
    },
    ssrc: {
      value: statsReport.ssrc,
      enumerable: true
    },
    packetsLost: {
      value: typeof statsReport.packetsLost === 'number' ? statsReport.packetsLost : null,
      enumerable: true
    },
    codec: {
      value: typeof statsReport.codecName === 'string' ? statsReport.codecName : null,
      enumerable: true
    }
  });
};

module.exports = TrackStats;