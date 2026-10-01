"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Mail,
  MessageCircle,
  RotateCcw,
  Send,
} from "lucide-react";

import { useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type ContactMethod = "whatsapp" | "email" | "meeting" | null;

type Country = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
};

/* ============================================================
   COUNTRIES
============================================================ */

const countries: Country[] = [
  {
    code: "MX",
    name: "Mexico",
    dialCode: "+52",
    flag: "🇲🇽",
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    flag: "🇨🇦",
  },
  {
    code: "ES",
    name: "Spain",
    dialCode: "+34",
    flag: "🇪🇸",
  },
  {
    code: "CO",
    name: "Colombia",
    dialCode: "+57",
    flag: "🇨🇴",
  },
  {
    code: "AR",
    name: "Argentina",
    dialCode: "+54",
    flag: "🇦🇷",
  },
  {
    code: "CL",
    name: "Chile",
    dialCode: "+56",
    flag: "🇨🇱",
  },
  {
    code: "PE",
    name: "Peru",
    dialCode: "+51",
    flag: "🇵🇪",
  },
  {
    code: "BR",
    name: "Brazil",
    dialCode: "+55",
    flag: "🇧🇷",
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧",
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    flag: "🇫🇷",
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    flag: "🇩🇪",
  },
  {
    code: "IT",
    name: "Italy",
    dialCode: "+39",
    flag: "🇮🇹",
  },
];

/* ============================================================
   QUESTIONS
============================================================ */

const steps = [
  {
    title: "What do you want to build?",
    subtitle: "You don't need to know anything about technology.",
    options: [
      ["Website", "A professional digital presence for your business."],
      ["E-commerce", "I want to sell products or services online."],
      ["Web App", "I want to automate a process."],
      ["Mobile App", "I want to build an application."],
      ["UX / UI", "I want to improve an existing product."],
      ["Not sure", "I have an idea and want to talk it through."],
    ],
  },
  {
    title: "What is the goal?",
    subtitle: "This helps us understand the project.",
    options: [
      ["Get customers", "I want to generate new opportunities."],
      ["Sell online", "I want to sell products or services."],
      ["Automate", "I want to reduce manual processes."],
      ["Launch an idea", "I want to turn an idea into a product."],
      ["Improve a product", "I want to improve something that already exists."],
      ["Other", "I have another goal."],
    ],
  },
  {
    title: "How complex is it?",
    subtitle: "Don't worry about technical terms.",
    options: [
      ["Simple", "A relatively straightforward experience."],
      ["Medium", "Users, forms, or integrations."],
      ["Custom", "A custom platform or system."],
    ],
  },
  {
    title: "When do you want to start?",
    subtitle: "This is not a commitment.",
    options: [
      ["As soon as possible", "I want to get started soon."],
      ["This month", "I'm preparing the project."],
      ["1–3 months", "I'm planning the project."],
      ["Just exploring", "I'm still defining my idea."],
    ],
  },
];

/* ============================================================
   CALENDAR
============================================================ */

/*
  IMPORTANT:

  Change this URL to your real availability page.

  Example Google Calendar:
  https://calendar.google.com/calendar/appointments/...

  Example Calendly:
  https://calendly.com/divlabs/...

  Example Cal.com:
  https://cal.com/divlabs/...
*/

const CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0/r";

/* ============================================================
   COMPONENT
============================================================ */

export default function Calculator() {
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<string[]>([]);

  const [contactMethod, setContactMethod] =
    useState<ContactMethod>(null);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState<Country>(
    countries[0]
  );

  const [countryOpen, setCountryOpen] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const current = steps[step];

  const finished = step === steps.length;

  /* ==========================================================
     SELECT OPTION
  ========================================================== */

  const selectOption = (option: string) => {
    const updated = [...answers];

    updated[step] = option;

    setAnswers(updated);

    setTimeout(() => {
      setStep((value) => value + 1);
    }, 220);
  };

  /* ==========================================================
     PREVIOUS
  ========================================================== */

  const previous = () => {
    if (step > 0) {
      setStep((value) => value - 1);
    }
  };

  /* ==========================================================
     RESET
  ========================================================== */

  const reset = () => {
    setStep(0);

    setAnswers([]);

    setContactMethod(null);

    setName("");

    setEmail("");

    setPhone("");

    setCountry(countries[0]);

    setCountryOpen(false);

    setLoading(false);

    setSuccess(false);

    setError("");
  };

  /* ==========================================================
     SELECT CONTACT METHOD
  ========================================================== */

  const chooseContactMethod = (
    method: ContactMethod
  ) => {
    setContactMethod(method);

    setError("");

    setSuccess(false);
  };

  /* ==========================================================
     VALIDATION
  ========================================================== */

  const isValidContact = () => {
    if (!name.trim()) {
      setError("Please tell us your name.");
      return false;
    }

    if (contactMethod === "email") {
      if (!email.trim()) {
        setError("Please enter your email address.");

        return false;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email address.");

        return false;
      }
    }

    if (contactMethod === "whatsapp") {
      if (!phone.trim()) {
        setError("Please enter your WhatsApp number.");

        return false;
      }

      const cleanPhone = phone.replace(/\D/g, "");

      if (cleanPhone.length < 7) {
        setError("Please enter a valid phone number.");

        return false;
      }
    }

    return true;
  };

  /* ==========================================================
     SUBMIT CONTACT
  ========================================================== */

  const submitContact = async () => {
    if (!isValidContact()) {
      return;
    }

    setLoading(true);

    setError("");

    try {
      const response = await fetch(
        "/api/project-inquiry",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),

            contactMethod,

            email:
              contactMethod === "email"
                ? email.trim()
                : "",

            phone:
              contactMethod === "whatsapp"
                ? phone.trim()
                : "",

            country:
              contactMethod === "whatsapp"
                ? {
                    code: country.code,
                    name: country.name,
                    dialCode: country.dialCode,
                  }
                : null,

            answers: {
              product: answers[0] || "",
              goal: answers[1] || "",
              complexity: answers[2] || "",
              timeline: answers[3] || "",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "We couldn't send the information."
        );
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        "We couldn't send your information. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     OPEN CALENDAR
  ========================================================== */

  const openCalendar = () => {
    window.open(
      CALENDAR_URL,
      "_blank",
      "noopener,noreferrer"
    );

    /*
      Optionally, we can send the lead
      to the backend first so you receive an email
      even when the user opens the calendar.
    */

    submitMeetingLead();
  };

  /* ==========================================================
     MEETING LEAD
  ========================================================== */

  const submitMeetingLead = async () => {
    if (!name.trim()) {
      setError("Please tell us your name.");

      return;
    }

    setLoading(true);

    try {
      await fetch("/api/project-inquiry", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),

          contactMethod: "meeting",

          email: email.trim(),

          phone: "",

          country: null,

          answers: {
            product: answers[0] || "",
            goal: answers[1] || "",
            complexity: answers[2] || "",
            timeline: answers[3] || "",
          },
        }),
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     PROJECT SUMMARY
  ========================================================== */

  const projectSummary = {
    product: answers[0] || "Not specified",
    goal: answers[1] || "Not specified",
    complexity: answers[2] || "Not specified",
    timeline: answers[3] || "Not specified",
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      id="calculator"
      className="bg-div-black py-32 md:py-48"
    >
      <div
        className="
          mx-auto
          w-[calc(100%-40px)]
          max-w-[1000px]
          md:w-[calc(100%-80px)]
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-16">

          <div
            className="
              font-mono
              text-[9px]
              tracking-[0.15em]
              text-white/30
            "
          >
            06 / PROJECT STARTER
          </div>

          <h2
            className="
              mt-8
              text-[clamp(3.8rem,8vw,8rem)]
              font-semibold
              leading-[0.84]
              tracking-[-0.08em]
            "
          >
            Let&apos;s build
            <br />

            <span className="text-white/25">
              something.
            </span>
          </h2>

          <p
            className="
              mt-8
              max-w-xl
              text-sm
              leading-6
              text-white/35
            "
          >
            Tell us what you want to build.
            You don't need to know anything about
            technology. We'll turn your idea into
            a clear plan.
          </p>

        </div>

        {/* ====================================================
            CALCULATOR
        ==================================================== */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#090909]
          "
        >

          {/* ==================================================
              PROGRESS
          ================================================== */}

          <div className="flex border-b border-white/10">

            {[...steps, { title: "Contact" }].map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    h-[2px]
                    flex-1
                    bg-white/5
                  "
                >
                  <div
                    className="
                      h-full
                      bg-div-cream
                      transition-all
                      duration-500
                    "
                    style={{
                      width:
                        index <= step
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>
              )
            )}

          </div>

          {/* ==================================================
              QUESTIONS
          ================================================== */}

          {!finished && (
            <div className="p-6 md:p-12">

              <div
                className="
                  mb-10
                  flex
                  items-start
                  justify-between
                "
              >

                <div>

                  <div
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.15em]
                      text-white/30
                    "
                  >
                    STEP{" "}
                    {String(step + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <h3
                    className="
                      mt-5
                      text-3xl
                      font-medium
                      tracking-[-0.05em]
                      md:text-5xl
                    "
                  >
                    {current.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      text-white/35
                    "
                  >
                    {current.subtitle}
                  </p>

                </div>

                <span
                  className="
                    font-mono
                    text-[10px]
                    text-white/20
                  "
                >
                  {step + 1}/{steps.length}
                </span>

              </div>

              {/* OPTIONS */}

              <div className="grid gap-2 md:grid-cols-2">

                {current.options.map(
                  ([title, description]) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() =>
                        selectOption(title)
                      }
                      className="
                        calculator-option
                        group
                        min-h-[130px]
                        rounded-xl
                        border
                        border-white/10
                        p-5
                        text-left
                        transition-all
                        duration-300
                        hover:border-white/40
                        hover:bg-white
                        hover:text-black
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                        "
                      >

                        <div>

                          <h4 className="text-lg font-medium">
                            {title}
                          </h4>

                          {description && (
                            <p
                              className="
                                mt-2
                                max-w-sm
                                text-xs
                                leading-5
                                text-white/35
                                group-hover:text-black/50
                              "
                            >
                              {description}
                            </p>
                          )}

                        </div>

                        <ArrowRight
                          size={16}
                          className="
                            opacity-30
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />

                      </div>

                    </button>
                  )
                )}

              </div>

              {step > 0 && (
                <button
                  type="button"
                  onClick={previous}
                  className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-white/35
                    transition-colors
                    hover:text-white
                  "
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              )}

            </div>
          )}

          {/* ==================================================
              CONTACT
          ================================================== */}

          {finished && (
            <div className="p-6 md:p-16">

              {/* ================================================
                  SUCCESS
              ================================================= */}

              {success ? (
                <SuccessState
                  contactMethod={contactMethod}
                  reset={reset}
                />
              ) : (
                <>
                  {/* ==============================================
                      INTRO
                  ============================================== */}

                  {!contactMethod && (
                    <>
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          text-black
                        "
                      >
                        <Check size={20} />
                      </div>

                      <div className="mt-10">

                        <div
                          className="
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.15em]
                            text-white/30
                          "
                        >
                          PROJECT DETAILS
                        </div>

                        <h3
                          className="
                            mt-5
                            max-w-3xl
                            text-[clamp(2.5rem,6vw,5.5rem)]
                            font-semibold
                            leading-[0.9]
                            tracking-[-0.07em]
                          "
                        >
                          Perfect.
                          <br />

                          <span className="text-white/25">
                            Let&apos;s talk.
                          </span>
                        </h3>

                        <p
                          className="
                            mt-8
                            max-w-xl
                            text-sm
                            leading-6
                            text-white/35
                          "
                        >
                          We have a first idea of what
                          you need. How would you like
                          to continue?
                        </p>

                      </div>

                      {/* PROJECT SUMMARY */}

                      <div
                        className="
                          mt-10
                          grid
                          gap-px
                          overflow-hidden
                          rounded-xl
                          border
                          border-white/10
                          bg-white/10
                          md:grid-cols-2
                        "
                      >

                        <SummaryItem
                          label="PROJECT"
                          value={
                            projectSummary.product
                          }
                        />

                        <SummaryItem
                          label="GOAL"
                          value={
                            projectSummary.goal
                          }
                        />

                        <SummaryItem
                          label="COMPLEXITY"
                          value={
                            projectSummary.complexity
                          }
                        />

                        <SummaryItem
                          label="TIMELINE"
                          value={
                            projectSummary.timeline
                          }
                        />

                      </div>

                      {/* CONTACT METHODS */}

                      <div
                        className="
                          mt-10
                          grid
                          gap-3
                          md:grid-cols-3
                        "
                      >

                        {/* WHATSAPP */}

                        <button
                          type="button"
                          onClick={() =>
                            chooseContactMethod(
                              "whatsapp"
                            )
                          }
                          className="
                            group
                            rounded-xl
                            border
                            border-white/10
                            p-6
                            text-left
                            transition-all
                            duration-300
                            hover:border-white/40
                            hover:bg-white
                            hover:text-black
                          "
                        >

                          <MessageCircle
                            size={20}
                            className="
                              text-white/50
                              transition-colors
                              group-hover:text-black
                            "
                          />

                          <h4 className="mt-8 text-lg">
                            WhatsApp
                          </h4>

                          <p
                            className="
                              mt-2
                              text-xs
                              leading-5
                              text-white/30
                              group-hover:text-black/50
                            "
                          >
                            Leave your number and
                            we&apos;ll contact you.
                          </p>

                        </button>

                        {/* EMAIL */}

                        <button
                          type="button"
                          onClick={() =>
                            chooseContactMethod(
                              "email"
                            )
                          }
                          className="
                            group
                            rounded-xl
                            border
                            border-white/10
                            p-6
                            text-left
                            transition-all
                            duration-300
                            hover:border-white/40
                            hover:bg-white
                            hover:text-black
                          "
                        >

                          <Mail
                            size={20}
                            className="
                              text-white/50
                              transition-colors
                              group-hover:text-black
                            "
                          />

                          <h4 className="mt-8 text-lg">
                            Email
                          </h4>

                          <p
                            className="
                              mt-2
                              text-xs
                              leading-5
                              text-white/30
                              group-hover:text-black/50
                            "
                          >
                            We&apos;ll send you the
                            information and follow up
                            with you.
                          </p>

                        </button>

                        {/* MEETING */}

                        <button
                          type="button"
                          onClick={() =>
                            chooseContactMethod(
                              "meeting"
                            )
                          }
                          className="
                            group
                            rounded-xl
                            border
                            border-white/10
                            p-6
                            text-left
                            transition-all
                            duration-300
                            hover:border-white/40
                            hover:bg-white
                            hover:text-black
                          "
                        >

                          <Calendar
                            size={20}
                            className="
                              text-white/50
                              transition-colors
                              group-hover:text-black
                            "
                          />

                          <h4 className="mt-8 text-lg">
                            Schedule a call
                          </h4>

                          <p
                            className="
                              mt-2
                              text-xs
                              leading-5
                              text-white/30
                              group-hover:text-black/50
                            "
                          >
                            Choose a time that works
                            for you.
                          </p>

                        </button>

                      </div>

                      <button
                        type="button"
                        onClick={reset}
                        className="
                          mt-8
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-white/30
                          transition-colors
                          hover:text-white
                        "
                      >
                        <RotateCcw size={13} />
                        Start over
                      </button>
                    </>
                  )}

                  {/* ==============================================
                      WHATSAPP FORM
                  ============================================== */}

                  {contactMethod ===
                    "whatsapp" && (
                    <WhatsAppForm
                      name={name}
                      setName={setName}
                      phone={phone}
                      setPhone={setPhone}
                      country={country}
                      setCountry={setCountry}
                      countryOpen={countryOpen}
                      setCountryOpen={
                        setCountryOpen
                      }
                      loading={loading}
                      error={error}
                      onBack={() =>
                        setContactMethod(null)
                      }
                      onSubmit={submitContact}
                    />
                  )}

                  {/* ==============================================
                      EMAIL FORM
                  ============================================== */}

                  {contactMethod ===
                    "email" && (
                    <EmailForm
                      name={name}
                      setName={setName}
                      email={email}
                      setEmail={setEmail}
                      loading={loading}
                      error={error}
                      onBack={() =>
                        setContactMethod(null)
                      }
                      onSubmit={submitContact}
                    />
                  )}

                  {/* ==============================================
                      MEETING
                  ============================================== */}

                  {contactMethod ===
                    "meeting" && (
                    <MeetingForm
                      name={name}
                      setName={setName}
                      email={email}
                      setEmail={setEmail}
                      loading={loading}
                      error={error}
                      onBack={() =>
                        setContactMethod(null)
                      }
                      onSubmit={openCalendar}
                    />
                  )}
                </>
              )}

            </div>
          )}

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SUMMARY ITEM
================================================================ */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#090909] p-5">

      <div
        className="
          font-mono
          text-[8px]
          tracking-[0.15em]
          text-white/25
        "
      >
        {label}
      </div>

      <div className="mt-3 text-sm text-white/70">
        {value}
      </div>

    </div>
  );
}

/* ================================================================
   WHATSAPP FORM
================================================================ */

function WhatsAppForm({
  name,
  setName,
  phone,
  setPhone,
  country,
  setCountry,
  countryOpen,
  setCountryOpen,
  loading,
  error,
  onBack,
  onSubmit,
}: {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  country: Country;
  setCountry: (country: Country) => void;
  countryOpen: boolean;
  setCountryOpen: (value: boolean) => void;
  loading: boolean;
  error: string;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-white/10
        "
      >
        <MessageCircle size={20} />
      </div>

      <h3
        className="
          mt-8
          text-3xl
          font-medium
          tracking-[-0.05em]
          md:text-5xl
        "
      >
        We&apos;ll contact you.
      </h3>

      <p
        className="
          mt-4
          max-w-xl
          text-sm
          leading-6
          text-white/35
        "
      >
        Leave your information and someone
        from the Div Labs team will contact
        you directly on WhatsApp.
      </p>

      <div className="mt-8 max-w-lg">

        {/* NAME */}

        <label
          className="
            mb-2
            block
            font-mono
            text-[8px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          Your name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Adrián"
          className="
            h-14
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            px-5
            text-sm
            text-white
            outline-none
            placeholder:text-white/20
            focus:border-white/40
          "
        />

        {/* PHONE */}

        <label
          className="
            mb-2
            mt-6
            block
            font-mono
            text-[8px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          WhatsApp
        </label>

        <div className="relative flex">

          {/* COUNTRY */}

          <button
            type="button"
            onClick={() =>
              setCountryOpen(!countryOpen)
            }
            className="
              flex
              h-14
              shrink-0
              items-center
              gap-2
              rounded-l-xl
              border
              border-r-0
              border-white/10
              bg-white/[0.025]
              px-4
              text-sm
              transition-colors
              hover:bg-white/[0.05]
            "
          >

            <span>{country.flag}</span>

            <span className="text-white/70">
              {country.dialCode}
            </span>

            <ChevronDown
              size={14}
              className="text-white/30"
            />

          </button>

          {/* COUNTRY MENU */}

          {countryOpen && (
            <div
              className="
                absolute
                left-0
                top-[62px]
                z-50
                max-h-[260px]
                w-[240px]
                overflow-y-auto
                rounded-xl
                border
                border-white/10
                bg-[#111]
                p-1
                shadow-2xl
              "
            >

              {countries.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setCountry(item);
                    setCountryOpen(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-left
                    text-xs
                    transition-colors
                    hover:bg-white
                    hover:text-black
                  "
                >

                  <span>
                    {item.flag}
                  </span>

                  <span className="flex-1">
                    {item.name}
                  </span>

                  <span className="opacity-50">
                    {item.dialCode}
                  </span>

                </button>
              ))}

            </div>
          )}

          {/* PHONE */}

          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="55 1234 5678"
            className="
              h-14
              min-w-0
              flex-1
              rounded-r-xl
              border
              border-white/10
              bg-white/[0.025]
              px-4
              text-sm
              text-white
              outline-none
              placeholder:text-white/20
              focus:border-white/40
            "
          />

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
            mt-5
            rounded-lg
            border
            border-red-400/20
            bg-red-400/5
            px-4
            py-3
            text-xs
            text-red-300/80
          "
        >
          {error}
        </div>
      )}

      {/* ACTIONS */}

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          type="button"
          disabled={loading}
          onClick={onSubmit}
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-div-cream
            px-6
            py-4
            text-sm
            font-medium
            text-black
            transition-all
            hover:scale-[1.02]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >

          {loading ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-black/20
                  border-t-black
                "
              />

              Sending...
            </>
          ) : (
            <>
              <Send size={16} />

              Send project
            </>
          )}

        </button>

        <button
          type="button"
          onClick={onBack}
          className="
            rounded-full
            border
            border-white/10
            px-6
            py-4
            text-sm
            text-white/60
            transition-colors
            hover:text-white
          "
        >
          Back
        </button>

      </div>

    </div>
  );
}

/* ================================================================
   EMAIL FORM
================================================================ */

function EmailForm({
  name,
  setName,
  email,
  setEmail,
  loading,
  error,
  onBack,
  onSubmit,
}: {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  loading: boolean;
  error: string;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-white/10
        "
      >
        <Mail size={20} />
      </div>

      <h3
        className="
          mt-8
          text-3xl
          font-medium
          tracking-[-0.05em]
          md:text-5xl
        "
      >
        We&apos;ll email you.
      </h3>

      <p
        className="
          mt-4
          max-w-xl
          text-sm
          leading-6
          text-white/35
        "
      >
        We&apos;ll send you a summary of your
        project and our team will follow up
        with you directly.
      </p>

      <div className="mt-8 max-w-lg">

        <label
          className="
            mb-2
            block
            font-mono
            text-[8px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          Your name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Adrián"
          className="
            h-14
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            px-5
            text-sm
            text-white
            outline-none
            placeholder:text-white/20
            focus:border-white/40
          "
        />

        <label
          className="
            mb-2
            mt-6
            block
            font-mono
            text-[8px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="you@company.com"
          className="
            h-14
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            px-5
            text-sm
            text-white
            outline-none
            placeholder:text-white/20
            focus:border-white/40
          "
        />

      </div>

      {error && (
        <div
          className="
            mt-5
            rounded-lg
            border
            border-red-400/20
            bg-red-400/5
            px-4
            py-3
            text-xs
            text-red-300/80
          "
        >
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          type="button"
          disabled={loading}
          onClick={onSubmit}
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-div-cream
            px-6
            py-4
            text-sm
            font-medium
            text-black
            transition-all
            hover:scale-[1.02]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >

          {loading ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-black/20
                  border-t-black
                "
              />

              Sending...
            </>
          ) : (
            <>
              <Send size={16} />

              Send information
            </>
          )}

        </button>

        <button
          type="button"
          onClick={onBack}
          className="
            rounded-full
            border
            border-white/10
            px-6
            py-4
            text-sm
            text-white/60
            hover:text-white
          "
        >
          Back
        </button>

      </div>

    </div>
  );
}

/* ================================================================
   MEETING FORM
================================================================ */

function MeetingForm({
  name,
  setName,
  email,
  setEmail,
  loading,
  error,
  onBack,
  onSubmit,
}: {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  loading: boolean;
  error: string;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-white/10
        "
      >
        <Calendar size={20} />
      </div>

      <h3
        className="
          mt-8
          text-3xl
          font-medium
          tracking-[-0.05em]
          md:text-5xl
        "
      >
        Let&apos;s talk.
      </h3>

      <p
        className="
          mt-4
          max-w-xl
          text-sm
          leading-6
          text-white/35
        "
      >
        Leave your name and email. You&apos;ll
        then be able to choose a time directly
        from our calendar.
      </p>

      <div className="mt-8 max-w-lg">

        <label
          className="
            mb-2
            block
            font-mono
            text-[8px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          Your name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Adrián"
          className="
            h-14
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            px-5
            text-sm
            text-white
            outline-none
            placeholder:text-white/20
            focus:border-white/40
          "
        />

        <label
          className="
            mb-2
            mt-6
            block
            font-mono
            text-[8px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="you@company.com"
          className="
            h-14
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            px-5
            text-sm
            text-white
            outline-none
            placeholder:text-white/20
            focus:border-white/40
          "
        />

      </div>

      {error && (
        <div
          className="
            mt-5
            rounded-lg
            border
            border-red-400/20
            bg-red-400/5
            px-4
            py-3
            text-xs
            text-red-300/80
          "
        >
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          type="button"
          disabled={loading}
          onClick={onSubmit}
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-div-cream
            px-6
            py-4
            text-sm
            font-medium
            text-black
            transition-all
            hover:scale-[1.02]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >

          {loading ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-black/20
                  border-t-black
                "
              />

              Preparing...
            </>
          ) : (
            <>
              <Calendar size={16} />

              View availability
            </>
          )}

        </button>

        <button
          type="button"
          onClick={onBack}
          className="
            rounded-full
            border
            border-white/10
            px-6
            py-4
            text-sm
            text-white/60
            hover:text-white
          "
        >
          Back
        </button>

      </div>

    </div>
  );
}

/* ================================================================
   SUCCESS
================================================================ */

function SuccessState({
  contactMethod,
  reset,
}: {
  contactMethod: ContactMethod;
  reset: () => void;
}) {
  const messages = {
    whatsapp: {
      title: "We got it.",
      description:
        "We received your information. Our team will review your project and contact you on WhatsApp.",
    },

    email: {
      title: "Check your inbox.",
      description:
        "We sent the information to your email. Our team also received your request and will follow up with you.",
    },

    meeting: {
      title: "See you soon.",
      description:
        "Your request has been registered. Complete the time selection in our calendar.",
    },
  };

  const content =
    messages[
      contactMethod || "email"
    ];

  return (
    <div>

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white
          text-black
        "
      >
        <Check size={20} />
      </div>

      <h3
        className="
          mt-8
          text-3xl
          font-medium
          tracking-[-0.05em]
          md:text-5xl
        "
      >
        {content.title}
      </h3>

      <p
        className="
          mt-5
          max-w-xl
          text-sm
          leading-6
          text-white/35
        "
      >
        {content.description}
      </p>

      <button
        type="button"
        onClick={reset}
        className="
          mt-8
          flex
          items-center
          gap-2
          text-xs
          text-white/40
          transition-colors
          hover:text-white
        "
      >
        <RotateCcw size={13} />
        Start another project
      </button>

    </div>
  );
}