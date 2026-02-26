import { h, ref } from "vue";
import { BButton, useToast } from "bootstrap-vue-next";

const texist = ref<boolean>(false);
export const promiseToast = (toast: ReturnType<typeof useToast>) => {
  if (texist.value === true) {
    console.log(texist.value);
    return;
  }
  texist.value = true;
  toast
    .create(
      {
        variant: "light",
        position: "middle-center",
        bodyClass: "w-100",
        noCloseButton: true,
        modelValue: true,
        slots: {
          default: ({ hide }) => [
            h(
              "div",
              {
                class:
                  "d-flex my-2 flex-column gap-2 align-items-center justify-content-center",
              },
              [
                h("h3", { class: "text-center" }, "测试"),
                h(
                  "div",
                  { class: "mt-3 d-flex justify-content-center gap-2" },
                  [
                    h(
                      BButton,
                      {
                        onClick: () => hide("ok"),
                        size: "md",
                        variant: "dark",
                      },
                      () => "确认",
                    ),
                    h(
                      BButton,
                      {
                        onClick: () => hide("cancel"),
                        size: "md",
                        variant: "outline-dark",
                      },
                      () => "取消",
                    ),
                  ],
                ),
              ],
            ),
          ],
        },
      },
      { resolveOnHide: true },
    )
    .then((r) => {
      if (r && typeof r === "object" && "ok" in r) {
        texist.value = false;
        toast.create({ title: `you pressed: ${r.ok ? "yes" : "no"}` });
      }
    });
};
