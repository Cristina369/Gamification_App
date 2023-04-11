import React from "react";
import FAQ from "./FAQ";

const Instructions = () => {
  return (
    <section className="w-10/12 h-full absolute block right-0 top-14 bg-white p-20">
      <h1 className="text-gray-200 font-bold text-[200px] -mb-36 ml-10 -mt-32">
        STEPS
      </h1>
      <div className="w-full flex flex-row gap-5 justify-center items-start">
        <div>
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 ">
              01
            </h5>
            <div className="w-7/12 h-[1px] bg-slate-200 mb-3"></div>
            <p class="font-normal text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Provident totam quasi vel rem illo accusamus voluptatem, optio eos
              tempora eum repellat, incidunt exercitationem nostrum nihil, ut
              officiis ex qui eligendi.
            </p>
          </a>
        </div>
        <div>
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
          >
            <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 ">
              02
            </h5>
            <div className="w-7/12 h-[1px] bg-slate-200 mb-3"></div>
            <p class="font-normal text-gray-700 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              aperiam aliquid animi quidem distinctio nulla, earum expedita qui
              rem cupiditate nisi tenetur saepe asperiores cumque. Sit deleniti
              reprehenderit autem tempora.
            </p>
          </a>
        </div>{" "}
        <div>
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              03
            </h5>
            <div className="w-7/12 h-[1px] bg-slate-200 mb-3"></div>
            <p class="font-normal text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae repellendus facilis nulla animi ex sint cumque ipsam a,
              at iure. Facere molestiae praesentium magnam est libero sit
              adipisci doloribus quasi.
            </p>
          </a>
        </div>
        <div>
          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              04
            </h5>
            <div className="w-7/12 h-[1px] bg-slate-200 mb-3"></div>
            <p class="font-normal text-gray-700">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
              dolores magni obcaecati ex officiis esse enim eum placeat labore
              doloremque! Odio ex saepe id fugiat, pariatur exercitationem minus
              commodi distinctio!
            </p>
          </a>
        </div>
      </div>
      <FAQ />
    </section>
  );
};

export default Instructions;
