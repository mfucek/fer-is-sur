export const cancellationSuggestionsCard = (...children: string[]) => {
	return `<tr>
		<td align="center">
			<table
				class="t413"
				role="presentation"
				cellpadding="0"
				cellspacing="0"
				style="
					margin-left: auto;
					margin-right: auto;
				"
			>
				<tr>
					<td
						width="592"
						class="t412"
						style="
							background-color: #ffffff;
							overflow: hidden;
							width: 600px;
							border-radius: 16px 16px 16px 16px;
						"
					>
						<table
							class="t411"
							role="presentation"
							cellpadding="0"
							cellspacing="0"
							width="100%"
							style="width: 100%"
						>
							<tr>
								<td
									class="t410"
									style="padding: 0 0 40px 0"
								>
									<table
										role="presentation"
										width="100%"
										cellpadding="0"
										cellspacing="0"
										style="width: 100% !important"
									>
										<tr>
											<td align="center">
												<table
													class="t210"
													role="presentation"
													cellpadding="0"
													cellspacing="0"
													style="
														margin-left: auto;
														margin-right: auto;
													"
												>
													<tr>
														<td
															width="592"
															class="t209"
															style="width: 600px"
														>
															<table
																class="t208"
																role="presentation"
																cellpadding="0"
																cellspacing="0"
																width="100%"
																style="
																	width: 100%;
																"
															>
																<tr>
																	<td
																		class="t207"
																		style="
																			padding: 40px
																				40px 40px
																				40px;
																		"
																	>
																		<p
																			class="t206"
																			style="
																				margin: 0;
																				margin: 0;
																				font-family:
																					Nunito
																						Sans,
																					BlinkMacSystemFont,
																					Segoe UI,
																					Helvetica
																						Neue,
																					Arial,
																					sans-serif;
																				line-height: 24px;
																				font-weight: 500;
																				font-style: normal;
																				font-size: 16px;
																				text-decoration: none;
																				text-transform: none;
																				letter-spacing: -0.56px;
																				direction: ltr;
																				color: #333333;
																				text-align: center;
																				mso-line-height-rule: exactly;
																				mso-text-raise: 2px;
																			"
																		>
																			&#x17D;ao
																			nam je
																			&#x161;to
																			ste
																			odlu&#x10D;ili
																			ne
																			sudjelovati
																			na
																			radionici.
																			Ako ponovo
																			budete u
																			prilici
																			sudjelovati
																			bacite oko
																			na
																			nadolaze&#x107;e
																			radionice.
																		</p>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										
										${children.join('\n')}
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<div
				class="t441"
				style="
					mso-line-height-rule: exactly;
					mso-line-height-alt: 24px;
					line-height: 24px;
					font-size: 1px;
					display: block;
				"
			>
				&nbsp;&nbsp;
			</div>
		</td>
	</tr>`;
};
