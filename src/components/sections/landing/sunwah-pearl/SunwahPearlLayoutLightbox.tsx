"use client";

import Lightbox, { CloseIcon, IconButton, type LightboxExternalProps } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function SunwahPearlLayoutLightbox({
  index,
  slides,
  close,
}: Pick<LightboxExternalProps, "index" | "slides" | "close">) {
  return (
    <Lightbox
      open
      index={index}
      slides={slides}
      close={close}
      plugins={[Zoom]}
      zoom={{ maxZoomPixelRatio: 3 }}
      controller={{ closeOnBackdropClick: true }}
      carousel={{ finite: true }}
      labels={{ Close: "Đóng", Next: "Ảnh tiếp", Previous: "Ảnh trước", "Zoom in": "Phóng to", "Zoom out": "Thu nhỏ" }}
      render={{ buttonClose: () => (
        <IconButton label="Close" icon={CloseIcon} onClick={close} onTouchEnd={(event) => {
          event.preventDefault();
          close?.();
        }} />
      ) }}
      styles={{ container: { backgroundColor: "rgba(0,0,0,.92)" } }}
    />
  );
}
