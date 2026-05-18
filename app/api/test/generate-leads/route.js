import { NextResponse } from "next/server";

export async function POST() {

  try {

    const requests = [];

    for (let i = 0; i < 10; i++) {

      requests.push(
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/leads`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              name: "Test " + i,
              phone:
                "90000000" + i,
              city: "Delhi",
              service:
                [
                  "Service 1",
                  "Service 2",
                  "Service 3"
                ][i % 3],
              description:
                "Concurrency Test"
            })
          }
        )
      );
    }

    await Promise.all(
      requests
    );

    return NextResponse.json({
      message:
        "10 leads generated"
    });

  } catch (error) {

    return NextResponse.json(
      {
        message:
          error.message
      },
      { status: 500 }
    );
  }
}